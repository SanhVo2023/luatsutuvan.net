import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLpPage, LP_SLUGS } from "@/content/lp-pages";
import { SITE, PHONE_DISPLAY, PHONE_TEL, GUARANTEES } from "@/config/site";
import LpLeadForm from "./LpLeadForm";

// Ad-traffic landing pages are statically generated, one per brief.
export const dynamic = "force-static";

// Reuse the site's canonical URL so /lp/ canonicals never drift from the rest
// of the site (SITE.url is the same source robots.ts + sitemap use).
const SITE_URL = SITE.url.replace(/\/$/, "");

export function generateStaticParams() {
  return LP_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getLpPage(slug);
  if (!page) return {};

  const url = `${SITE_URL}/lp/${page.slug}`;
  return {
    title: `${page.headline} | ${SITE.name}`,
    description: page.subheadline,
    keywords: [page.keyword],
    alternates: { canonical: url },
    // /lp/ is paid ad traffic — keep it out of the organic index (robots.ts also
    // disallows the path) but let bots follow internal links for crawl health.
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
    openGraph: {
      title: page.headline,
      description: page.subheadline,
      url,
      type: "website",
      locale: "vi_VN",
      siteName: SITE.name,
    },
  };
}

const TRUST_SIGNALS = [
  { value: "15+", label: "Năm kinh nghiệm tố tụng" },
  { value: "5.000+", label: "Khách hàng đã hỗ trợ" },
  { value: "100%", label: "Bảo mật thông tin" },
  { value: "24/7", label: "Tiếp nhận tư vấn" },
];

export default async function LpPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = getLpPage(slug);
  if (!page) notFound();

  return (
    <main className="bg-surface text-navy min-h-dvh">
      {/* Stripped header: logo only, NO main navigation (no exit links that
          would leak the paid visitor away from the form). */}
      <header className="border-b border-black/5 bg-white">
        <div className="container-x flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <span className="bg-trust flex h-9 w-9 items-center justify-center rounded-lg text-base font-black text-white">
              LS
            </span>
            <span className="text-navy text-lg font-extrabold tracking-tight">
              {SITE.name}
            </span>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            className="bg-trust hover:bg-trust-600 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white transition"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Gọi ngay</span>
          </a>
        </div>
      </header>

      {/* HERO — headline + subheadline + bullets on the left, lead form
          ABOVE THE FOLD on the right. */}
      <section className="from-trust-700 via-trust to-trust-600 relative overflow-hidden bg-gradient-to-br">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div className="container-x relative grid items-start gap-8 py-10 lg:grid-cols-2 lg:gap-12 lg:py-16">
          {/* Left column: pitch */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide uppercase backdrop-blur">
              <span className="bg-urgency h-2 w-2 rounded-full" />
              {page.keyword}
            </span>
            <h1 className="mt-4 text-3xl leading-tight font-black text-white sm:text-4xl lg:text-[2.75rem]">
              {page.headline}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              {page.subheadline}
            </p>

            <ul className="mt-6 space-y-3">
              {page.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="bg-urgency mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    <svg
                      className="h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-[15px] leading-relaxed text-white/95">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 hidden items-center gap-4 lg:flex">
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-urgency text-2xl font-black"
              >
                {PHONE_DISPLAY}
              </a>
              <span className="text-sm text-white/80">
                Hotline tư vấn miễn phí · {GUARANTEES.response}
              </span>
            </div>
          </div>

          {/* Right column: lead form (above the fold) */}
          <div className="lg:sticky lg:top-6">
            <LpLeadForm
              practiceArea={page.practiceArea}
              keyword={page.keyword}
              slug={page.slug}
              ctaLabel={page.ctaLabel}
            />
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-b border-black/5 bg-white">
        <div className="container-x grid grid-cols-2 gap-4 py-8 lg:grid-cols-4">
          {TRUST_SIGNALS.map((t) => (
            <div key={t.label} className="text-center">
              <div className="text-confidence text-2xl font-black sm:text-3xl">
                {t.value}
              </div>
              <div className="text-steel mt-1 text-xs font-medium sm:text-sm">
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Intro / reassurance copy */}
      <section className="bg-surface">
        <div className="container-x max-w-3xl py-12">
          <h2 className="text-navy text-2xl font-bold">
            Vì sao nên chọn luật sư đồng hành cùng bạn?
          </h2>
          <p className="text-navy/85 mt-4 text-[15px] leading-8">{page.intro}</p>

          {/* Reassurance badges (no outbound links) */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Bảo mật tuyệt đối",
                desc: "Mọi thông tin của bạn được giữ kín theo quy tắc đạo đức nghề luật sư.",
              },
              {
                title: "Chi phí minh bạch",
                desc: "Báo giá rõ ràng trước khi thực hiện, không phát sinh bất ngờ.",
              },
              {
                title: GUARANTEES.callback,
                desc: "Luật sư liên hệ lại trong thời gian ngắn sau khi bạn đăng ký.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <div className="bg-trust-50 mb-2 flex h-10 w-10 items-center justify-center rounded-lg">
                  <svg
                    className="text-trust h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="text-navy font-bold">{item.title}</h3>
                <p className="text-steel mt-1 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA — anchors back to hotline (no exit links) */}
      <section className="from-confidence to-confidence-700 bg-gradient-to-r">
        <div className="container-x max-w-4xl py-12 text-center">
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Đừng để vấn đề pháp lý kéo dài thêm
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Gọi ngay hoặc để lại số điện thoại để được luật sư tư vấn miễn phí về{" "}
            <strong>{page.keyword}</strong>.
          </p>
          <a
            href={`tel:${PHONE_TEL}`}
            className="bg-urgency mt-6 inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-black text-white transition hover:opacity-90"
          >
            <PhoneIcon className="h-5 w-5" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </section>

      {/* Minimal footer — copyright only, deliberately no nav links */}
      <section className="bg-navy py-6">
        <div className="container-x text-center text-xs text-white/55">
          © {new Date().getFullYear()} {SITE.name}. Bảo lưu mọi quyền. Nội dung
          mang tính tham khảo, không thay thế tư vấn pháp lý chính thức.
        </div>
      </section>
    </main>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
