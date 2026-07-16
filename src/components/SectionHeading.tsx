import ScrollReveal from '@/components/animations/ScrollReveal'

/**
 * Consistent centered section header (eyebrow + title + optional lead).
 * Pass `as="h1"` on a page's hero heading — every indexed page must render
 * exactly one <h1>.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: string
  lead?: string
  align?: 'center' | 'left'
  as?: 'h1' | 'h2'
}) {
  return (
    <ScrollReveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <span className={`eyebrow mb-4 ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</span>
      )}
      <Tag className="text-3xl font-extrabold text-navy">{title}</Tag>
      {lead && <p className="mt-4 text-lg leading-relaxed text-steel">{lead}</p>}
    </ScrollReveal>
  )
}
