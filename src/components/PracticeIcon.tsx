import {
  HeartCrack,
  Map,
  Building2,
  Scale,
  Gavel,
  Handshake,
  ScrollText,
  FileSignature,
  type LucideIcon,
} from 'lucide-react'

const MAP: Record<string, LucideIcon> = {
  HeartCrack,
  Map,
  Building2,
  Scale,
  Gavel,
  Handshake,
  ScrollText,
  FileSignature,
}

export default function PracticeIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = MAP[name] ?? Scale
  return <Icon className={className} aria-hidden strokeWidth={1.75} />
}
