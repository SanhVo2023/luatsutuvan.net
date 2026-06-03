import ScrollReveal from '@/components/animations/ScrollReveal'

/** Consistent centered section header (eyebrow + title + optional lead). */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
}: {
  eyebrow?: string
  title: string
  lead?: string
  align?: 'center' | 'left'
}) {
  return (
    <ScrollReveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <span className={`eyebrow mb-4 ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</span>
      )}
      <h2 className="text-3xl font-extrabold text-navy">{title}</h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-steel">{lead}</p>}
    </ScrollReveal>
  )
}
