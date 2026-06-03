import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Layout for the Google-Ads landing-page section.
 *
 * The global site chrome (Header/Footer/FloatingActions) is suppressed for any
 * /lp/* path by SiteChrome (src/components/SiteChrome.tsx, path-aware), so the
 * landing pages stay conversion-focused with no outbound navigation that could
 * leak the visitor away. Each page (lp/[slug]/page.tsx) renders its own stripped
 * logo-only header + minimal footer.
 *
 * This layout's only job is a section-wide default: keep all /lp/ routes out of
 * the organic index (robots.ts also disallows the path). The per-page
 * generateMetadata refines this and adds the canonical URL.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function LpLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
