import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Calendar } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import SectionHeading from '@/components/SectionHeading'
import FinalCta from '@/components/FinalCta'
import QuickForm from '@/components/forms/QuickForm'
import JsonLd from '@/components/JsonLd'
import { pageMeta, breadcrumbLd } from '@/lib/seo'
import { listBlogPosts, categoryName, type Rendition } from '@/lib/hub'
import { SEO_ARTICLES } from '@/content/seo-articles'

export const revalidate = 3600

export const metadata = pageMeta({
  title: 'Cẩm Nang Pháp Lý — Hỏi Đáp & Hướng Dẫn',
  description:
    'Cẩm nang pháp lý thực tế: hướng dẫn thủ tục, chi phí, quyền lợi và cách xử lý các vấn đề pháp lý thường gặp. Kèm tư vấn miễn phí.',
  path: '/noi-dung-tu-van',
})

interface CardItem {
  slug: string
  title: string
  excerpt: string
  image?: string | null
  updated?: string
  category?: string | null
}

function fromRendition(r: Rendition): CardItem {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? '',
    image: r.heroImageUrl ?? null,
    updated: r.updatedAt,
    category: categoryName(r.category),
  }
}

export default async function ContentListPage() {
  // Hub-served blog posts; fall back to local seed content if the hub is down.
  const hub = await listBlogPosts({ limit: 100 })
  const items: CardItem[] = hub.docs.length
    ? hub.docs.map(fromRendition)
    : SEO_ARTICLES.map((a) => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        image: a.image,
        updated: a.updated,
        category: null,
      }))

  const [featured, ...rest] = items

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Trang chủ', path: '/' },
          { name: 'Cẩm nang', path: '/noi-dung-tu-van' },
        ])}
      />
      <section className="container-x pt-8">
        <Breadcrumbs items={[{ name: 'Cẩm nang', path: '/noi-dung-tu-van' }]} />
      </section>

      <section className="container-x py-10 sm:py-14">
        <SectionHeading
          as="h1"
          eyebrow="Cẩm nang pháp lý"
          title="Hiểu rõ vấn đề trước khi hành động"
          lead="Những hướng dẫn thực tế, dễ hiểu về các tình huống pháp lý thường gặp — kèm lối tắt để hỏi luật sư ngay."
        />

        {featured && (
          <Link
            href={`/noi-dung-tu-van/${featured.slug}`}
            className="card card-lift group mt-10 grid overflow-hidden md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[18rem]">
              {featured.image && (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-9">
              <span className="pill pill-trust mb-3 w-fit">Bài nổi bật</span>
              <h2 className="text-2xl font-extrabold leading-tight text-navy group-hover:text-trust-700 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-steel">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 font-bold text-trust-700">
                Đọc bài viết <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-5 sm:grid-cols-2">
            {rest.map((a) => (
              <Link
                key={a.slug}
                href={`/noi-dung-tu-van/${a.slug}`}
                className="card card-lift group flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                  {a.image && (
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {a.category && <span className="pill pill-confidence mb-2 w-fit">{a.category}</span>}
                  <h3 className="text-lg font-extrabold leading-snug text-navy group-hover:text-trust-700">
                    {a.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-steel">{a.excerpt}</p>
                  {a.updated && (
                    <span className="mt-3 flex items-center gap-1.5 text-xs text-steel">
                      <Calendar className="h-3.5 w-3.5" /> Cập nhật{' '}
                      {new Date(a.updated).toLocaleDateString('vi-VN')}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <QuickForm stacked heading="Có câu hỏi riêng? Hỏi luật sư ngay" />
          </aside>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
