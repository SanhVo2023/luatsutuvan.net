'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: string
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen ? 'border-trust/40 bg-white shadow-[var(--shadow-card)]' : 'border-[rgba(26,35,50,0.08)] bg-white'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[1.05rem] font-bold text-navy">{it.question}</span>
              <Plus
                className={`h-5 w-5 shrink-0 text-trust transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-5 leading-relaxed text-steel">{it.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
