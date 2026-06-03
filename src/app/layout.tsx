import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { MotionConfig } from 'framer-motion'
import './globals.css'
import SiteChrome from '@/components/SiteChrome'
import JsonLd from '@/components/JsonLd'
import { legalServiceLd } from '@/lib/seo'
import { SITE } from '@/config/site'
import { getNavigation } from '@/lib/hub'

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-be-vietnam',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Luật Sư Tư Vấn — Phản Hồi Trong 30 Phút | Apolo Lawyers',
    template: '%s | Luật Sư Tư Vấn',
  },
  description:
    'Gửi câu hỏi cho luật sư chuyên nghiệp ngay hôm nay. Phản hồi nhanh trong 30 phút. Miễn phí tư vấn lần đầu. Gọi 0903 419 479.',
  keywords: ['tư vấn luật sư', 'hỏi luật sư online', 'đặt lịch luật sư', 'tư vấn pháp luật miễn phí'],
  authors: [{ name: 'Apolo Lawyers' }],
  applicationName: SITE.name,
  formatDetection: { telephone: true },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = {
  themeColor: '#0D9F6E',
  width: 'device-width',
  initialScale: 1,
  // viewport-fit=cover is REQUIRED for env(safe-area-inset-*) to resolve to a
  // non-zero value on iOS Safari (incl. iOS 26) and Chrome Android. Without it,
  // the fixed mobile action bar sits under the browser's bottom toolbar / home
  // indicator. interactive-widget=resizes-content makes the on-screen keyboard
  // shrink the layout (good for our lead forms) instead of overlaying it.
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
}

export const revalidate = 3600

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Footer/nav chrome is editable in the Content Hub; fetch it (cached, with a
  // built-in fallback inside the components if the hub is unreachable).
  const nav = await getNavigation()
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body className="min-h-dvh antialiased">
        <JsonLd data={legalServiceLd()} />
        <MotionConfig reducedMotion="user">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-trust focus:px-4 focus:py-2 focus:text-white"
          >
            Đến nội dung chính
          </a>
          <SiteChrome nav={nav}>{children}</SiteChrome>
        </MotionConfig>
      </body>
    </html>
  )
}
