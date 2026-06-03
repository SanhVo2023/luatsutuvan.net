import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-steel">
      <Link href="/" className="inline-flex items-center gap-1 hover:text-trust">
        <Home className="h-3.5 w-3.5" /> Trang chủ
      </Link>
      {items.map((it, i) => (
        <span key={it.path} className="inline-flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          {i === items.length - 1 ? (
            <span className="font-semibold text-navy">{it.name}</span>
          ) : (
            <Link href={it.path} className="hover:text-trust">
              {it.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
