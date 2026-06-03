'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'
import type { Navigation } from '@/lib/hub'

/**
 * Renders the global site chrome (Header / Footer / floating actions) around the
 * page — EXCEPT on Google-Ads landing pages under /lp/, which are deliberately
 * chrome-free and self-contained (their own stripped logo-only header + minimal
 * footer, no outbound nav that would leak the paid visitor away).
 *
 * This is a thin client wrapper so the root layout can stay a Server Component.
 */
export default function SiteChrome({
  children,
  nav,
}: {
  children: React.ReactNode
  nav?: Navigation | null
}) {
  const pathname = usePathname()
  const isLanding = pathname?.startsWith('/lp/') ?? false

  if (isLanding) {
    // Landing pages provide their own <main>; render bare so /lp/ has zero
    // inherited navigation.
    return <>{children}</>
  }

  return (
    <>
      <Header />
      {/* Reserve space for the fixed mobile action bar (60px) + the device safe
          area, so the last content isn't hidden behind it or the home indicator
          on newer iOS Safari / Chrome Android. */}
      <main
        id="main"
        className="pb-[calc(60px+env(safe-area-inset-bottom))] md:pb-0"
      >
        {children}
      </main>
      <Footer nav={nav} />
      <FloatingActions />
    </>
  )
}
