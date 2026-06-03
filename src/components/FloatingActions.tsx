'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, MessageCircle, FileQuestion } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_TEL, ZALO_URL } from '@/config/site'

/**
 * Floating action bar (PRD §6 spec).
 * Desktop: fixed bottom-right vertical stack (phone ring-pulse, Zalo, form).
 * Mobile: full-width bottom bar with "Gọi Ngay" + "Gửi Câu Hỏi", appears after 2s.
 */
export default function FloatingActions() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {/* Desktop vertical stack */}
      <div
        className={`fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 transition-all duration-500 md:flex ${
          show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2"
          aria-label="Chat Zalo"
        >
          <span className="pointer-events-none rounded-full bg-navy px-3 py-1.5 text-sm font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            Chat Zalo
          </span>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-confidence text-white shadow-[0_8px_24px_-6px_rgba(30,107,184,0.5)] transition-transform hover:scale-105">
            <MessageCircle className="h-6 w-6" />
          </span>
        </a>
        <Link href="/gui-cau-hoi" className="group flex items-center gap-2" aria-label="Gửi câu hỏi">
          <span className="pointer-events-none rounded-full bg-navy px-3 py-1.5 text-sm font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            Gửi câu hỏi
          </span>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-transform hover:scale-105">
            <FileQuestion className="h-6 w-6" />
          </span>
        </Link>
        <a href={`tel:${PHONE_TEL}`} className="group flex items-center gap-2" aria-label={`Gọi ${PHONE_DISPLAY}`}>
          <span className="pointer-events-none rounded-full bg-trust px-3 py-1.5 text-sm font-bold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            {PHONE_DISPLAY}
          </span>
          <span className="ring-pulse flex h-16 w-16 items-center justify-center rounded-full bg-trust text-white">
            <Phone className="h-7 w-7" />
          </span>
        </a>
      </div>

      {/* Mobile bottom bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px bg-[rgba(26,35,50,0.08)] shadow-[0_-4px_24px_-8px_rgba(26,35,50,0.3)] transition-transform duration-500 md:hidden ${
          show ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <a href={`tel:${PHONE_TEL}`} className="flex h-[60px] items-center justify-center gap-2 bg-trust font-bold uppercase text-white">
          <Phone className="h-5 w-5" /> Gọi Ngay
        </a>
        <Link href="/gui-cau-hoi" className="flex h-[60px] items-center justify-center gap-2 bg-confidence font-bold uppercase text-white">
          <FileQuestion className="h-5 w-5" /> Gửi Câu Hỏi
        </Link>
      </div>
    </>
  )
}
