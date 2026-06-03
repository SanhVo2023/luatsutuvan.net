import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowUpRight } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Markdown } from '@/components/Markdown'
import ConsultForm from '@/components/forms/ConsultForm'
import QuickForm from '@/components/forms/QuickForm'
import FinalCta from '@/components/FinalCta'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbLd, absUrl } from '@/lib/seo'
import { listBlogPosts, getRendition, categorySlug } from '@/lib/hub'
import { getPracticeArea, EMAIL } from '@/config/site'
import { EDITORIAL_AUTHOR } from '@/config/apolo'

export const revalidate = 3600
export const dynamicParams = true

/** Blog category slug → the site's practice-area page slug (for the form + pill). */
const CATEGORY_TO_PRACTICE: Record<string, string> = {
  'hon-nhan-gia-dinh': 'tu-van-ly-hon',
  'dat-dai': 'tu-van-dat-dai',
  'doanh-nghiep': 'tu-van-doanh-nghiep',
  'dan-su': 'tu-van-dan-su',
  'hinh-su': 'tu-van-hinh-su',
  'lao-dong': 'tu-van-lao-dong',
  'thua-ke': 'tu-van-thua-ke',
  'hop-dong': 'tu-van-hop-dong',
}

// Render blog detail pages on-demand (ISR), NOT all at build. Pre-rendering 40+
// pages hammers the hub with concurrent requests during `next build` and bakes
// transient failures as permanent 404s. On-demand + revalidate keeps each page
// to a single cached hub call and lets new hub posts appear without a rebuild.
export function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = await getRendition(slug)
  if (!a) return {}
  // Strip any brand suffix the editor added — the layout title template appends
  // " | Luật Sư Tư Vấn" itself, so we avoid doubling it.
  const rawTitle = a.meta?.title || a.title
  const title = rawTitle.replace(/\s*\|\s*Luật Sư Tư Vấn\s*$/i, '').trim()
  return pageMeta({
    title,
    description: a.meta?.description || a.excerpt || '',
    path: `/noi-dung-tu-van/${a.slug}`,
    image: a.heroImageUrl || undefined,
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = await getRendition(slug)
  if (!a) notFound()

  const catSlug = categorySlug(a.category)
  const practiceSlug = catSlug ? CATEGORY_TO_PRACTICE[catSlug] : undefined
  const pa = practiceSlug ? getPracticeArea(practiceSlug) : undefined

  // Related: other published blog posts in the same category.
  const relatedRes = catSlug ? await listBlogPosts({ categorySlug: catSlug, limit: 3 }) : { docs: [] as never[] }
  const related = relatedRes.docs.filter((x) => x.slug !== a.slug).slice(0, 2)

  const updated = a.updatedAt || a.createdAt
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.excerpt || '',
    ...(a.heroImageUrl ? { image: a.heroImageUrl } : {}),
    ...(updated ? { datePublished: updated, dateModified: updated } : {}),
    author: { '@type': 'Organization', name: EDITORIAL_AUTHOR.name },
    publisher: { '@type': 'Organization', name: 'Apolo Lawyers', email: EMAIL },
    mainEntityOfPage: absUrl(`/noi-dung-tu-van/${a.slug}`),
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Trang chủ', path: '/' },
            { name: 'Cẩm nang', path: '/noi-dung-tu-van' },
            { name: a.title, path: `/noi-dung-tu-van/${a.slug}` },
          ]),
          articleLd,
        ]}
      />

      <section className="container-x pt-8">
        <Breadcrumbs
          items={[
            { name: 'Cẩm nang', path: '/noi-dung-tu-van' },
            { name: a.title, path: `/noi-dung-tu-van/${a.slug}` },
          ]}
        />
      </section>

      <article className="container-x py-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            {pa && (
              <Link href={`/tu-van-theo-linh-vuc/${pa.slug}`} className="pill pill-confidence mb-4 w-fit">
                {pa.name}
              </Link>
            )}
            <h1 className="text-[2rem] font-extrabold leading-tight text-navy sm:text-[2.6rem]">{a.title}</h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-steel">
              {updated && (
                <>
                  <Calendar className="h-4 w-4" /> Cập nhật {new Date(updated).toLocaleDateString('vi-VN')} ·{' '}
                </>
              )}
              {EDITORIAL_AUTHOR.name}
            </p>

            {a.heroImageUrl && (
              <div className="relative my-6 aspect-[16/8] overflow-hidden rounded-2xl">
                <Image
                  src={a.heroImageUrl}
                  alt={a.title}
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 720px"
                  className="object-cover"
                />
              </div>
            )}

            <Markdown>{a.body}</Markdown>

            <div className="my-8">
              <QuickForm
                practiceArea={pa?.value}
                heading="Vấn đề của bạn có điểm khác biệt? Hỏi luật sư ngay"
              />
            </div>

            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-4 text-xl font-extrabold text-navy">Bài viết liên quan</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/noi-dung-tu-van/${r.slug}`}
                      className="card card-lift group flex items-center gap-3 p-4"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface">
                        {r.heroImageUrl && (
                          <Image src={r.heroImageUrl} alt={r.title} fill sizes="64px" className="object-cover" />
                        )}
                      </div>
                      <span className="font-bold leading-snug text-navy group-hover:text-trust-700">
                        {r.title}
                        <ArrowUpRight className="ml-1 inline h-4 w-4 text-trust opacity-0 transition group-hover:opacity-100" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <ConsultForm
              defaultArea={pa?.slug}
              lockArea={!!pa}
              title="Tư vấn miễn phí về vấn đề này"
            />
          </aside>
        </div>
      </article>

      <FinalCta />
    </>
  )
}
