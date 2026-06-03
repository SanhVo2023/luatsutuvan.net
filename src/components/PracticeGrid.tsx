'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PRACTICE_AREAS } from '@/config/site'
import PracticeIcon from '@/components/PracticeIcon'

/** 8-area routing grid (PRD §3). StaggerReveal + hover lift. */
export default function PracticeGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PRACTICE_AREAS.map((p, i) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/tu-van-theo-linh-vuc/${p.slug}`}
            className="card card-lift group flex h-full flex-col p-6"
          >
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-trust-50 to-confidence-50 text-confidence transition-colors group-hover:from-trust group-hover:to-trust group-hover:text-white">
              <PracticeIcon name={p.icon} className="h-7 w-7" />
            </span>
            <h3 className="mb-1.5 flex items-center gap-1 text-lg font-extrabold text-navy">
              {p.name}
              <ArrowUpRight className="h-4 w-4 text-trust opacity-0 transition-opacity group-hover:opacity-100" />
            </h3>
            <p className="text-[0.95rem] leading-relaxed text-steel">{p.tagline}</p>
            <span className="mt-4 text-sm font-bold text-trust-700">Tư vấn ngay →</span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
