// Landing-page data for Google Ads traffic (/lp/[slug]).
// These pages are conversion-optimized, distinct from the normal site pages,
// and are excluded from indexing (see robots.ts + generateMetadata robots).

export type PracticeArea =
  | "ly-hon"
  | "dat-dai"
  | "doanh-nghiep"
  | "dan-su"
  | "hinh-su"
  | "lao-dong"
  | "thua-ke"
  | "hop-dong";

export interface LpPage {
  /** URL slug under /lp/ */
  slug: string;
  /** Practice-area key (used for analytics / form tagging) */
  practiceArea: PracticeArea;
  /** Big H1 hero headline */
  headline: string;
  /** Supporting subheadline under the H1 */
  subheadline: string;
  /** Primary target keyword (used in metadata + form source tag) */
  keyword: string;
  /** Benefit bullets shown in the hero */
  bullets: string[];
  /** 120-180 word VN intro paragraph (rendered below the fold) */
  intro: string;
  /** Primary CTA / form-submit button label */
  ctaLabel: string;
}

export const LP_PAGES: LpPage[] = [
  {
    slug: "tu-van-ly-hon-nhanh",
    practiceArea: "ly-hon",
    headline: "Ly Hôn Nhanh, Kín Đáo - Tư Vấn Trong 15 Phút",
    subheadline:
      "Luật sư hôn nhân gia đình đồng hành giải quyết ly hôn đơn phương, thuận tình, chia tài sản và giành quyền nuôi con - bảo mật tuyệt đối.",
    keyword: "tư vấn ly hôn nhanh",
    bullets: [
      "Tư vấn miễn phí qua điện thoại, Zalo trong 15 phút",
      "Soạn đơn và hồ sơ ly hôn trọn gói, không cần đi lại nhiều",
      "Bảo vệ tối đa quyền nuôi con và phần tài sản của bạn",
      "Hỗ trợ ly hôn đơn phương khi đối phương không hợp tác",
    ],
    intro:
      "Ly hôn là quyết định không dễ dàng và thường đi kèm nhiều lo lắng về tài sản, con cái cũng như danh dự cá nhân. Đội ngũ luật sư hôn nhân gia đình của chúng tôi hiểu rằng mỗi hồ sơ là một câu chuyện riêng, vì vậy chúng tôi luôn lắng nghe kỹ lưỡng và tư vấn giải pháp phù hợp nhất cho bạn. Dù bạn cần ly hôn thuận tình để khép lại êm đẹp, hay buộc phải ly hôn đơn phương khi đối phương né tránh, chúng tôi đều có phương án rõ ràng. Luật sư sẽ giúp bạn soạn đơn, chuẩn bị hồ sơ, xác định tài sản chung - riêng và xây dựng chiến lược giành quyền nuôi con. Mọi thông tin được bảo mật tuyệt đối. Hãy để lại số điện thoại, luật sư sẽ gọi lại tư vấn miễn phí trong vòng 15 phút để bạn biết chính xác bước tiếp theo cần làm.",
    ctaLabel: "Nhận Tư Vấn Ly Hôn Miễn Phí",
  },
  {
    slug: "tu-van-tranh-chap-dat-dai",
    practiceArea: "dat-dai",
    headline: "Tranh Chấp Đất Đai - Đòi Lại Quyền Lợi Của Bạn",
    subheadline:
      "Luật sư đất đai giàu kinh nghiệm giải quyết tranh chấp sổ đỏ, ranh giới, đất không giấy tờ và thừa kế đất - tư vấn ngay hôm nay.",
    keyword: "tư vấn tranh chấp đất đai",
    bullets: [
      "Đánh giá khả năng thắng kiện miễn phí",
      "Xử lý cả trường hợp đất chưa có sổ đỏ",
      "Đại diện hòa giải tại xã và khởi kiện tại tòa",
      "Thu thập chứng cứ, định giá đất chuyên nghiệp",
    ],
    intro:
      "Tranh chấp đất đai là loại tranh chấp phức tạp, kéo dài và dễ gây thiệt hại lớn nếu bạn không nắm rõ quy định pháp luật. Từ tranh chấp ranh giới, lối đi chung, đất chưa có sổ đỏ đến tranh chấp thừa kế quyền sử dụng đất, mỗi trường hợp đòi hỏi cách tiếp cận và bộ chứng cứ khác nhau. Luật sư đất đai của chúng tôi sẽ đánh giá khách quan khả năng thắng kiện, chỉ rõ điểm mạnh - điểm yếu trong hồ sơ của bạn ngay từ buổi tư vấn đầu tiên. Chúng tôi hỗ trợ thu thập trích lục bản đồ, xác minh nguồn gốc đất, định giá tài sản và đại diện bạn trong cả giai đoạn hòa giải tại Ủy ban nhân dân lẫn khởi kiện tại Tòa án. Mục tiêu là bảo vệ quyền sử dụng đất hợp pháp và lợi ích chính đáng của bạn. Hãy để lại thông tin để được luật sư tư vấn nhanh hôm nay.",
    ctaLabel: "Nhận Đánh Giá Hồ Sơ Miễn Phí",
  },
  {
    slug: "tu-van-luat-doanh-nghiep",
    practiceArea: "doanh-nghiep",
    headline: "Tư Vấn Pháp Lý Doanh Nghiệp Trọn Gói",
    subheadline:
      "Từ thành lập, thay đổi đăng ký kinh doanh đến giải thể và thu hồi nợ - luật sư doanh nghiệp đồng hành cùng sự phát triển của bạn.",
    keyword: "tư vấn luật doanh nghiệp",
    bullets: [
      "Thành lập công ty nhanh chỉ trong 3-5 ngày",
      "Tư vấn thuế, hợp đồng và quản trị nội bộ",
      "Thu hồi công nợ và xử lý tranh chấp đối tác",
      "Bảo hộ thương hiệu, sở hữu trí tuệ",
    ],
    intro:
      "Mỗi doanh nghiệp đều cần một nền tảng pháp lý vững chắc để phát triển bền vững và hạn chế rủi ro. Chúng tôi cung cấp dịch vụ tư vấn pháp lý doanh nghiệp trọn gói, đồng hành cùng bạn từ những ngày đầu thành lập công ty cho đến khi mở rộng quy mô hoặc tái cấu trúc. Luật sư hỗ trợ thành lập doanh nghiệp nhanh gọn, thay đổi đăng ký kinh doanh, soạn thảo điều lệ, hợp đồng và quy chế quản trị nội bộ chặt chẽ. Khi phát sinh tranh chấp với đối tác hay công nợ khó đòi, chúng tôi giúp bạn xử lý đúng luật và hiệu quả, hạn chế tối đa thiệt hại. Ngoài ra, đội ngũ còn tư vấn về thuế, lao động, bảo hộ thương hiệu và sở hữu trí tuệ. Hãy để doanh nghiệp của bạn được bảo vệ bởi những người am hiểu pháp luật - liên hệ ngay để được tư vấn.",
    ctaLabel: "Nhận Tư Vấn Doanh Nghiệp",
  },
  {
    slug: "tu-van-doi-no-dan-su",
    practiceArea: "dan-su",
    headline: "Đòi Nợ Hợp Pháp - Lấy Lại Tiền Của Bạn",
    subheadline:
      "Cho vay không trả, bị quỵt tiền dù có hay không có giấy vay? Luật sư dân sự giúp bạn thu hồi nợ đúng luật, nhanh và hiệu quả.",
    keyword: "tư vấn đòi nợ cá nhân",
    bullets: [
      "Tư vấn cách đòi nợ cả khi không có giấy vay nợ",
      "Soạn công văn, đơn khởi kiện đòi nợ chuyên nghiệp",
      "Đại diện khởi kiện và thi hành án thu hồi nợ",
      "Phân tích khi nào con nợ bị truy cứu hình sự",
    ],
    intro:
      "Cho vay tiền nhưng không đòi được là tình huống khiến nhiều người vừa mất tiền vừa mệt mỏi tinh thần. Nhiều người ngại đòi nợ vì không có giấy vay nợ, hoặc lo sợ làm sai luật khi tự mình thu hồi. Luật sư dân sự của chúng tôi sẽ giúp bạn đòi nợ một cách hợp pháp, bài bản và hiệu quả. Ngay cả khi bạn không có giấy vay nợ, chúng tôi vẫn có thể hỗ trợ thu thập chứng cứ như tin nhắn, ghi âm, chuyển khoản để chứng minh quan hệ vay mượn. Luật sư soạn thảo công văn yêu cầu trả nợ, đơn khởi kiện và đại diện bạn trong quá trình tố tụng cũng như thi hành án. Khi có dấu hiệu lạm dụng tín nhiệm hoặc lừa đảo chiếm đoạt tài sản, chúng tôi tư vấn cả hướng tố giác hình sự. Hãy liên hệ để được tư vấn cách lấy lại tiền của bạn.",
    ctaLabel: "Nhận Tư Vấn Thu Hồi Nợ",
  },
  {
    slug: "tu-van-luat-su-bao-chua-hinh-su",
    practiceArea: "hinh-su",
    headline: "Luật Sư Bào Chữa Hình Sự - Có Mặt Ngay Khi Bạn Cần",
    subheadline:
      "Người thân bị tạm giữ, khởi tố? Luật sư hình sự bảo vệ quyền lợi từ giai đoạn đầu, hướng tới án treo và mức án nhẹ nhất.",
    keyword: "luật sư bào chữa hình sự",
    bullets: [
      "Tiếp nhận và tư vấn khẩn cấp 24/7",
      "Tham gia bào chữa từ giai đoạn điều tra",
      "Tư vấn điều kiện hưởng án treo, giảm nhẹ hình phạt",
      "Bảo vệ quyền lợi cho cả bị can và người bị hại",
    ],
    intro:
      "Khi người thân bị tạm giữ, tạm giam hoặc khởi tố, từng giờ trôi qua đều quý giá và mọi quyết định đều có thể ảnh hưởng đến cả cuộc đời. Luật sư hình sự cần có mặt càng sớm càng tốt để bảo vệ quyền lợi hợp pháp ngay từ giai đoạn điều tra, khi bị can dễ tổn thương nhất. Chúng tôi tiếp nhận và tư vấn khẩn cấp 24/7, hướng dẫn gia đình những việc cần làm ngay và những điều tuyệt đối nên tránh. Luật sư tham gia hỏi cung, nghiên cứu hồ sơ, thu thập chứng cứ gỡ tội và xây dựng phương án bào chữa hướng tới án treo hoặc mức án nhẹ nhất có thể. Chúng tôi cũng bảo vệ quyền lợi cho người bị hại trong các vụ án hình sự. Đừng để sự chậm trễ làm mất đi cơ hội - hãy liên hệ luật sư ngay bây giờ.",
    ctaLabel: "Gọi Luật Sư Hình Sự Ngay",
  },
  {
    slug: "tu-van-luat-lao-dong-sa-thai",
    practiceArea: "lao-dong",
    headline: "Bị Sa Thải, Nợ Lương? Đòi Lại Quyền Lợi Lao Động",
    subheadline:
      "Luật sư lao động bảo vệ người lao động và doanh nghiệp trong tranh chấp sa thải, nợ lương, hợp đồng và bảo hiểm - tư vấn ngay.",
    keyword: "tư vấn luật lao động sa thải",
    bullets: [
      "Tư vấn miễn phí về sa thải trái pháp luật",
      "Đòi lương, trợ cấp và bồi thường thôi việc",
      "Hỗ trợ hồ sơ bảo hiểm thất nghiệp",
      "Đại diện hòa giải và khởi kiện tranh chấp lao động",
    ],
    intro:
      "Bị sa thải trái pháp luật, bị nợ lương hay không được chi trả trợ cấp là những thiệt thòi mà người lao động thường phải gánh chịu do thiếu thông tin pháp lý. Bộ luật Lao động quy định rất rõ về điều kiện chấm dứt hợp đồng, trình tự xử lý kỷ luật và các khoản người lao động được hưởng - và nhiều quyết định sa thải trên thực tế là trái luật. Luật sư lao động của chúng tôi giúp bạn xác định doanh nghiệp có làm đúng quy trình hay không, từ đó yêu cầu nhận lại làm việc hoặc bồi thường thỏa đáng. Chúng tôi hỗ trợ đòi lương, trợ cấp thôi việc, bồi thường, hoàn thiện hồ sơ bảo hiểm thất nghiệp và đại diện bạn tại hòa giải, tòa án. Chúng tôi cũng tư vấn cho doanh nghiệp xây dựng quy trình nhân sự đúng luật. Hãy để lại thông tin để được tư vấn miễn phí.",
    ctaLabel: "Nhận Tư Vấn Lao Động Miễn Phí",
  },
  {
    slug: "tu-van-thua-ke-di-chuc",
    practiceArea: "thua-ke",
    headline: "Tư Vấn Thừa Kế & Lập Di Chúc - Tránh Tranh Chấp Gia Đình",
    subheadline:
      "Luật sư hỗ trợ lập di chúc hợp pháp, khai nhận và phân chia di sản, giải quyết tranh chấp thừa kế nhanh gọn, giữ hòa khí gia đình.",
    keyword: "tư vấn thừa kế di chúc",
    bullets: [
      "Lập di chúc hợp pháp, chặt chẽ, tránh tranh chấp",
      "Hỗ trợ khai nhận và sang tên di sản trọn gói",
      "Giải quyết tranh chấp thừa kế giữa các đồng thừa kế",
      "Tư vấn quyền thừa kế khi không có di chúc",
    ],
    intro:
      "Di sản thừa kế là vấn đề nhạy cảm, không ít gia đình rạn nứt tình thân chỉ vì phân chia tài sản không rõ ràng. Một bản di chúc được lập đúng pháp luật ngay từ đầu sẽ giúp người để lại tài sản yên tâm và giúp con cháu tránh được những tranh chấp đau lòng về sau. Luật sư của chúng tôi tư vấn lập di chúc hợp pháp, chặt chẽ về hình thức lẫn nội dung, bảo đảm ý nguyện của bạn được tôn trọng và khó bị vô hiệu. Khi người thân qua đời, chúng tôi hỗ trợ thủ tục khai nhận và phân chia di sản, sang tên nhà đất trọn gói, kể cả trong trường hợp không có di chúc và phải chia theo pháp luật. Với những mâu thuẫn đã phát sinh giữa các đồng thừa kế, luật sư giúp hòa giải hoặc đại diện khởi kiện để bảo vệ quyền lợi của bạn mà vẫn giữ được hòa khí gia đình. Hãy liên hệ để được tư vấn cụ thể.",
    ctaLabel: "Nhận Tư Vấn Thừa Kế",
  },
  {
    slug: "tu-van-soan-thao-hop-dong",
    practiceArea: "hop-dong",
    headline: "Soạn Thảo & Rà Soát Hợp Đồng - Bịt Mọi Lỗ Hổng Pháp Lý",
    subheadline:
      "Một hợp đồng chặt chẽ giúp bạn tránh mất tiền oan. Luật sư soạn thảo, rà soát và giải quyết tranh chấp hợp đồng chuyên nghiệp.",
    keyword: "tư vấn soạn thảo hợp đồng",
    bullets: [
      "Soạn thảo hợp đồng theo từng nhu cầu cụ thể",
      "Rà soát, cảnh báo rủi ro pháp lý trước khi ký",
      "Tư vấn điều khoản phạt và bồi thường thiệt hại",
      "Đại diện giải quyết tranh chấp hợp đồng tại tòa, trọng tài",
    ],
    intro:
      "Phần lớn tranh chấp trong kinh doanh và giao dịch dân sự đều bắt nguồn từ những hợp đồng sơ sài, thiếu chặt chẽ hoặc có điều khoản bất lợi mà các bên không nhận ra khi ký. Một hợp đồng được soạn thảo và rà soát kỹ lưỡng chính là tấm lá chắn giúp bạn tránh mất tiền oan và bảo vệ quyền lợi khi có rủi ro. Luật sư của chúng tôi soạn thảo hợp đồng theo đúng nhu cầu và đặc thù giao dịch của bạn, từ hợp đồng mua bán, hợp tác, vay mượn đến hợp đồng lao động, dịch vụ. Trước khi bạn đặt bút ký, chúng tôi rà soát toàn bộ điều khoản, chỉ ra các rủi ro pháp lý tiềm ẩn và đề xuất điều khoản phạt, bồi thường thiệt hại phù hợp. Khi xảy ra tranh chấp, luật sư đại diện bạn thương lượng, giải quyết tại tòa án hoặc trọng tài thương mại. Hãy liên hệ để hợp đồng của bạn thật sự an toàn.",
    ctaLabel: "Nhận Tư Vấn Hợp Đồng",
  },
];

export function getLpPage(slug: string): LpPage | undefined {
  return LP_PAGES.find((p) => p.slug === slug);
}

export const LP_SLUGS = LP_PAGES.map((p) => p.slug);
