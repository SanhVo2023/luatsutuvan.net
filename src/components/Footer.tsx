import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle, Scale, Clock } from 'lucide-react'
import { SITE, PHONE_DISPLAY, PHONE_TEL, EMAIL, ZALO_URL, WHATSAPP_URL, PRACTICE_AREAS, GUARANTEES } from '@/config/site'
import type { Navigation } from '@/lib/hub'

/**
 * Footer. The link columns + legal line are EDITABLE in the Content Hub
 * (navigation global). When the hub provides `nav.footerColumns` we render those;
 * otherwise we fall back to the built-in defaults so the site never breaks if the
 * hub is unreachable.
 */
export default function Footer({ nav }: { nav?: Navigation | null }) {
  const year = new Date().getFullYear()
  const hubColumns = nav?.footerColumns?.filter((c) => c.links && c.links.length) ?? []
  const useHub = hubColumns.length > 0
  const legal = nav?.footerLegal?.trim()
  return (
    <footer className="relative mt-20 overflow-hidden bg-navy text-white/80">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-trust via-confidence to-urgency" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* brand + contact */}
        <div className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-trust text-white">
              <Scale className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold text-white">
              Luật Sư <span className="text-trust">Tư Vấn</span>
            </span>
          </div>
          <p className="mb-4 text-sm leading-relaxed">{SITE.legalName}</p>
          <a href={`tel:${PHONE_TEL}`} className="mb-2 flex items-center gap-2 text-xl font-extrabold text-trust">
            <Phone className="h-5 w-5" /> {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm hover:text-white">
            <Mail className="h-4 w-4" /> {EMAIL}
          </a>
        </div>

        {/* link columns — hub-editable, with built-in fallback */}
        {useHub ? (
          hubColumns.map((col, i) => (
            <div key={col.heading ?? i}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{col.heading}</h4>
              <ul className="space-y-2.5 text-sm">
                {col.links!.map((l) => (
                  <li key={l.href + l.label}>
                    {l.href.startsWith('http') ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-trust">{l.label}</a>
                    ) : (
                      <Link href={l.href} className="hover:text-trust">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Lĩnh vực tư vấn</h4>
              <ul className="space-y-2.5 text-sm">
                {PRACTICE_AREAS.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/tu-van-theo-linh-vuc/${p.slug}`} className="hover:text-trust">{p.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Tư vấn nhanh</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/gui-cau-hoi" className="hover:text-trust">Gửi câu hỏi cho luật sư</Link></li>
                <li><Link href="/dat-lich-tu-van" className="hover:text-trust">Đặt lịch tư vấn</Link></li>
                <li><Link href="/quy-trinh-tiep-nhan" className="hover:text-trust">Quy trình tiếp nhận</Link></li>
                <li><Link href="/cau-hoi-thuong-gap" className="hover:text-trust">Câu hỏi thường gặp</Link></li>
                <li><Link href="/noi-dung-tu-van" className="hover:text-trust">Cẩm nang pháp lý</Link></li>
                <li><Link href="/lien-he" className="hover:text-trust">Liên hệ</Link></li>
                <li>
                  <a href={SITE.parentBrandUrl} target="_blank" rel="noopener noreferrer" className="hover:text-trust">
                    Apolo Lawyers (apolo.com.vn)
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* office + channels */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Văn phòng</h4>
          <p className="mb-3 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-trust" />
            <span>{SITE.address}</span>
          </p>
          <p className="mb-4 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-trust" />
            <span>Chi nhánh: {SITE.branchAddress}</span>
          </p>
          <p className="mb-4 flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-trust" /> T2–T7: 08:00 – 20:00
          </p>
          <div className="flex gap-2">
            <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-confidence text-white hover:opacity-90" aria-label="Zalo">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-trust text-white hover:opacity-90" aria-label="WhatsApp">
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5">
          <p className="mb-3 text-xs leading-relaxed text-white/45">
            {legal ||
              'Nội dung trên website mang tính tham khảo chung, không thay thế tư vấn pháp lý cho từng trường hợp cụ thể. Quy định pháp luật có thể thay đổi theo thời gian — vui lòng liên hệ luật sư để được tư vấn chính xác cho tình huống của bạn.'}
          </p>
          <div className="flex flex-col items-center justify-between gap-2 border-t border-white/[0.06] pt-4 text-xs text-white/60 md:flex-row">
            <p>© {year} {SITE.shortName}. {GUARANTEES.free}.</p>
            <div className="flex gap-4">
              <Link href="/chinh-sach-bao-mat" className="hover:text-white">Chính sách bảo mật</Link>
              <Link href="/dieu-khoan-su-dung" className="hover:text-white">Điều khoản sử dụng</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
